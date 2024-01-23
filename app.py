from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search_projects():
    query = request.form.get('query')
    response = requests.get(f'https://api.github.com/search/repositories?q={query}+language:python+language:javascript+stars:%3E10')
    data = response.json()
    return jsonify(data['items'])

if __name__ == '__main__':
    app.run(debug=True)
