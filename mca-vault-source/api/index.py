from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Check if Google Places API key is available
        api_key = os.environ.get('GOOGLE_PLACES_API_KEY', 'Not configured')
        
        response = {
            "status": "ok",
            "message": "MCA Lead Generator API is running",
            "google_places_configured": api_key != 'Not configured',
            "endpoints": {
                "/api/health": "Health check",
                "/api/lead": "Submit lead (POST)"
            }
        }
        self.wfile.write(json.dumps(response).encode())
        return
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {"status": "received", "message": "Lead data received"}
        self.wfile.write(json.dumps(response).encode())
        return
# Test Mon Mar 16 06:22:12 AM CST 2026
