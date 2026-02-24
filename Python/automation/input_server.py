#! python3

from http.server import BaseHTTPRequestHandler, HTTPServer
from select import kevent
from pynput.keyboard import Key, Controller
from urllib.parse import urlparse, unquote


hostName = 'localhost'
port = 8000


keyboard = Controller()


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html></html>", 'utf-8'))
        # content_len = int(self.headers.get('Content-Length'))

        query = urlparse(self.path).query
        query_components = dict(qc.split("=") for qc in query.split("&"))

        # text = self.rfile.read(content_len).decode('utf-8')
        text = query_components['text']
        text = unquote(text)
        print('get', self.path, text)

        # if self.path == '/type':
        keyboard.type(text)
    
    def do_PUT(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html></html>", 'utf-8'))
        content_len = int(self.headers.get('Content-Length'))
        text = self.rfile.read(content_len).decode('utf-8')
        print('post', self.path, text)

        if self.path == '/type':
            keyboard.type(text)

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html></html>", 'utf-8'))
        content_len = int(self.headers.get('Content-Length'))
        text = self.rfile.read(content_len).decode('utf-8')
        print('post', self.path, text)

        if self.path == '/type':
            keyboard.type(text)
    


server = HTTPServer((hostName, port), MyServer)

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
