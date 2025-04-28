import os
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix

# Create the app
app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

app.secret_key = os.environ.get("SESSION_SECRET", "default-dev-secret-key")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)  # needed for url_for to generate with https

# Backend API configuration
app.config['BACKEND_API_URL'] = os.environ.get('BACKEND_API_URL', 'http://localhost:8000')

# Import routes
import routes
