"""
Utility functions for the frontend application.
"""

import json
import os
from flask import current_app, flash, redirect, url_for

def get_api_url(endpoint):
    """
    Get the full URL for an API endpoint.
    
    Args:
        endpoint (str): The API endpoint path (without leading slash)
        
    Returns:
        str: The complete API URL
    """
    base_url = current_app.config['BACKEND_API_URL']
    if not endpoint.startswith('/'):
        endpoint = f'/{endpoint}'
    return f"{base_url}{endpoint}"

def handle_api_error(response, default_redirect='dashboard'):
    """
    Handle API error responses.
    
    Args:
        response: The API response object
        default_redirect (str): The default route to redirect to
        
    Returns:
        Response: A Flask redirect response
    """
    try:
        error_data = response.json()
        error_message = error_data.get('message', 'An error occurred with the API request.')
    except json.JSONDecodeError:
        error_message = f"Error: {response.status_code} - {response.text}"
    
    flash(error_message, 'danger')
    return redirect(url_for(default_redirect))