# search.py

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        query = query_components.get('query', [''])[0]

        # Replace this with your actual search logic
        result = {"query": query, "results": ["Project1", "Project2", "Project3"]}

        self.wfile.write(json.dumps(result).encode('utf-8'))

def run():
    print('Starting server...')
    server_address = ('', 3000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Server running on port 3000...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
