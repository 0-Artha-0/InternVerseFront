"""
Frontend routes for the Virtual Internship Simulator.
These routes handle the user interface and interact with the backend API.
"""

import os
import json
import requests
from flask import render_template, redirect, url_for, flash, request, session, jsonify
from frontend.app import app
from frontend.utils import get_api_url, handle_api_error

# Constants
API_BASE_URL = app.config['BACKEND_API_URL']

# Auth routes
@app.route('/')
def index():
    """Landing page"""
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page"""
    if request.method == 'POST':
        data = {
            'email': request.form.get('email'),
            'password': request.form.get('password')
        }
        
        try:
            response = requests.post(f"{API_BASE_URL}/api/auth/login", json=data)
            
            if response.status_code == 200:
                # Store token in session
                result = response.json()
                session['auth_token'] = result.get('token')
                session['user_id'] = result.get('user_id')
                session['username'] = result.get('username')
                session['is_admin'] = result.get('is_admin', False)
                
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid email or password. Please try again.', 'danger')
        except Exception as e:
            flash(f'An error occurred: {str(e)}', 'danger')
        
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Registration page"""
    if request.method == 'POST':
        data = {
            'username': request.form.get('username'),
            'email': request.form.get('email'),
            'password': request.form.get('password'),
            'confirm_password': request.form.get('confirm_password')
        }
        
        try:
            response = requests.post(f"{API_BASE_URL}/api/auth/register", json=data)
            
            if response.status_code == 201:
                flash('Registration successful! Please log in.', 'success')
                return redirect(url_for('login'))
            else:
                error_msg = response.json().get('message', 'Registration failed. Please try again.')
                flash(error_msg, 'danger')
        except Exception as e:
            flash(f'An error occurred: {str(e)}', 'danger')
        
    return render_template('register.html')

@app.route('/logout')
def logout():
    """Logout and clear session"""
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

# Dashboard routes
@app.route('/dashboard')
def dashboard():
    """User dashboard"""
    if 'auth_token' not in session:
        flash('Please log in to access the dashboard.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        # Get user profile
        profile_response = requests.get(f"{API_BASE_URL}/api/auth/profile", headers=headers)
        
        if profile_response.status_code != 200:
            flash('Failed to load user profile.', 'danger')
            return redirect(url_for('login'))
        
        user_profile = profile_response.json()
        
        # Get user internships
        internships_response = requests.get(f"{API_BASE_URL}/api/internships/user", headers=headers)
        
        if internships_response.status_code != 200:
            internships = []
        else:
            internships = internships_response.json()
        
        # Get recent activities
        activities_response = requests.get(f"{API_BASE_URL}/api/internships/activities", headers=headers)
        
        if activities_response.status_code != 200:
            activities = []
        else:
            activities = activities_response.json()
        
        return render_template(
            'dashboard.html',
            profile=user_profile,
            internships=internships,
            activities=activities
        )
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('login'))

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    """User profile page"""
    if 'auth_token' not in session:
        flash('Please log in to access your profile.', 'warning')
        return redirect(url_for('login'))
    
    headers = {'Authorization': f"Bearer {session['auth_token']}"}
    
    if request.method == 'POST':
        data = {
            'full_name': request.form.get('full_name'),
            'major': request.form.get('major'),
            'university': request.form.get('university'),
            'career_interests': request.form.get('career_interests'),
            'graduation_year': request.form.get('graduation_year'),
            'bio': request.form.get('bio')
        }
        
        try:
            response = requests.put(f"{API_BASE_URL}/api/auth/profile", headers=headers, json=data)
            
            if response.status_code == 200:
                flash('Profile updated successfully!', 'success')
            else:
                error_msg = response.json().get('message', 'Failed to update profile.')
                flash(error_msg, 'danger')
        except Exception as e:
            flash(f'An error occurred: {str(e)}', 'danger')
    
    try:
        # Get user profile
        profile_response = requests.get(f"{API_BASE_URL}/api/auth/profile", headers=headers)
        
        if profile_response.status_code != 200:
            flash('Failed to load user profile.', 'danger')
            return redirect(url_for('dashboard'))
        
        user_profile = profile_response.json()
        
        return render_template('profile.html', profile=user_profile)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

# Internship routes
@app.route('/industries')
def industries():
    """Industries selection page"""
    if 'auth_token' not in session:
        flash('Please log in to browse industries.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        response = requests.get(f"{API_BASE_URL}/api/internships/industries", headers=headers)
        
        if response.status_code != 200:
            flash('Failed to load industries.', 'danger')
            return redirect(url_for('dashboard'))
        
        industries = response.json()
        
        return render_template('industries.html', industries=industries)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/internship/<int:internship_id>')
def internship_detail(internship_id):
    """Internship detail page"""
    if 'auth_token' not in session:
        flash('Please log in to view internship details.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        # Get internship details
        internship_response = requests.get(f"{API_BASE_URL}/api/internships/{internship_id}", headers=headers)
        
        if internship_response.status_code != 200:
            flash('Failed to load internship details.', 'danger')
            return redirect(url_for('dashboard'))
        
        internship = internship_response.json()
        
        # Get tasks for this internship
        tasks_response = requests.get(f"{API_BASE_URL}/api/tasks/internship/{internship_id}", headers=headers)
        
        if tasks_response.status_code != 200:
            tasks = []
        else:
            tasks = tasks_response.json()
        
        return render_template('internship.html', internship=internship, tasks=tasks)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/task/<int:task_id>')
def task_detail(task_id):
    """Task detail page"""
    if 'auth_token' not in session:
        flash('Please log in to view task details.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        # Get task details
        task_response = requests.get(f"{API_BASE_URL}/api/tasks/{task_id}", headers=headers)
        
        if task_response.status_code != 200:
            flash('Failed to load task details.', 'danger')
            return redirect(url_for('dashboard'))
        
        task = task_response.json()
        
        # Get submissions for this task
        submissions_response = requests.get(f"{API_BASE_URL}/api/tasks/{task_id}/submissions", headers=headers)
        
        if submissions_response.status_code != 200:
            submissions = []
        else:
            submissions = submissions_response.json()
        
        return render_template('task_detail.html', task=task, submissions=submissions)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/submit-task/<int:task_id>', methods=['POST'])
def submit_task(task_id):
    """Submit a task"""
    if 'auth_token' not in session:
        flash('Please log in to submit tasks.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        data = {
            'content': request.form.get('content'),
            'file_urls': request.form.get('file_urls', '')
        }
        
        response = requests.post(f"{API_BASE_URL}/api/tasks/{task_id}/submit", headers=headers, json=data)
        
        if response.status_code == 201:
            flash('Task submitted successfully!', 'success')
        else:
            error_msg = response.json().get('message', 'Failed to submit task.')
            flash(error_msg, 'danger')
        
        return redirect(url_for('task_detail', task_id=task_id))
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('task_detail', task_id=task_id))

# Supervisor routes
@app.route('/ask-supervisor', methods=['GET', 'POST'])
def ask_supervisor():
    """Chat with AI supervisor"""
    if 'auth_token' not in session:
        flash('Please log in to chat with the supervisor.', 'warning')
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        try:
            headers = {'Authorization': f"Bearer {session['auth_token']}"}
            
            data = {
                'question': request.form.get('question'),
                'internship_id': request.form.get('internship_id'),
                'task_id': request.form.get('task_id')
            }
            
            response = requests.post(f"{API_BASE_URL}/api/supervisor/ask", headers=headers, json=data)
            
            if response.status_code == 200:
                result = response.json()
                answer = result.get('answer', 'No response from supervisor.')
                
                # Store in session for display
                if 'chat_history' not in session:
                    session['chat_history'] = []
                
                session['chat_history'].append({
                    'question': data['question'],
                    'answer': answer
                })
                
                # Limit chat history size
                if len(session['chat_history']) > 10:
                    session['chat_history'] = session['chat_history'][-10:]
                
                session.modified = True
            else:
                error_msg = response.json().get('message', 'Failed to get response from supervisor.')
                flash(error_msg, 'danger')
        except Exception as e:
            flash(f'An error occurred: {str(e)}', 'danger')
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        # Get user's active internships
        internships_response = requests.get(f"{API_BASE_URL}/api/internships/user", headers=headers)
        
        if internships_response.status_code != 200:
            internships = []
        else:
            internships = internships_response.json()
        
        # Get current chat context if any
        internship_id = request.args.get('internship_id')
        task_id = request.args.get('task_id')
        
        current_internship = None
        current_task = None
        
        if internship_id:
            # Get specific internship
            int_response = requests.get(f"{API_BASE_URL}/api/internships/{internship_id}", headers=headers)
            if int_response.status_code == 200:
                current_internship = int_response.json()
        
        if task_id:
            # Get specific task
            task_response = requests.get(f"{API_BASE_URL}/api/tasks/{task_id}", headers=headers)
            if task_response.status_code == 200:
                current_task = task_response.json()
        
        chat_history = session.get('chat_history', [])
        
        return render_template(
            'supervisor_chat.html',
            internships=internships,
            current_internship=current_internship,
            current_task=current_task,
            chat_history=chat_history
        )
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

# Certificate routes
@app.route('/certificate/<int:certificate_id>')
def view_certificate(certificate_id):
    """View certificate page"""
    if 'auth_token' not in session:
        flash('Please log in to view certificates.', 'warning')
        return redirect(url_for('login'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        response = requests.get(f"{API_BASE_URL}/api/internships/certificate/{certificate_id}", headers=headers)
        
        if response.status_code != 200:
            flash('Failed to load certificate.', 'danger')
            return redirect(url_for('dashboard'))
        
        certificate = response.json()
        
        return render_template('certificate.html', certificate=certificate)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

# Admin routes
@app.route('/admin/dashboard')
def admin_dashboard():
    """Admin dashboard"""
    if 'auth_token' not in session or not session.get('is_admin', False):
        flash('Admin access required.', 'danger')
        return redirect(url_for('dashboard'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        # Get admin stats
        stats_response = requests.get(f"{API_BASE_URL}/api/admin/stats", headers=headers)
        
        if stats_response.status_code != 200:
            flash('Failed to load admin statistics.', 'danger')
            return redirect(url_for('dashboard'))
        
        stats = stats_response.json()
        
        return render_template('admin/dashboard.html', stats=stats)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/admin/users')
def admin_users():
    """Admin users page"""
    if 'auth_token' not in session or not session.get('is_admin', False):
        flash('Admin access required.', 'danger')
        return redirect(url_for('dashboard'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        response = requests.get(f"{API_BASE_URL}/api/admin/users", headers=headers)
        
        if response.status_code != 200:
            flash('Failed to load users.', 'danger')
            return redirect(url_for('admin_dashboard'))
        
        users = response.json()
        
        return render_template('admin/users.html', users=users)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('admin_dashboard'))

@app.route('/admin/internships')
def admin_internships():
    """Admin internships page"""
    if 'auth_token' not in session or not session.get('is_admin', False):
        flash('Admin access required.', 'danger')
        return redirect(url_for('dashboard'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        response = requests.get(f"{API_BASE_URL}/api/admin/internships", headers=headers)
        
        if response.status_code != 200:
            flash('Failed to load internships.', 'danger')
            return redirect(url_for('admin_dashboard'))
        
        internships = response.json()
        
        return render_template('admin/internships.html', internships=internships)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('admin_dashboard'))

@app.route('/admin/analytics')
def admin_analytics():
    """Admin analytics page"""
    if 'auth_token' not in session or not session.get('is_admin', False):
        flash('Admin access required.', 'danger')
        return redirect(url_for('dashboard'))
    
    try:
        headers = {'Authorization': f"Bearer {session['auth_token']}"}
        
        response = requests.get(f"{API_BASE_URL}/api/admin/analytics", headers=headers)
        
        if response.status_code != 200:
            flash('Failed to load analytics.', 'danger')
            return redirect(url_for('admin_dashboard'))
        
        analytics = response.json()
        
        return render_template('admin/analytics.html', analytics=analytics)
        
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('admin_dashboard'))