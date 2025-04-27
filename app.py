
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/internship', methods=['GET', 'POST'])
def internship():
    if request.method == 'POST':
        industry = request.form.get('industry')
        return render_template('internship.html', industry=industry)
    return redirect(url_for('start'))

@app.route('/certificate')
def certificate():
    return render_template('certificate.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
