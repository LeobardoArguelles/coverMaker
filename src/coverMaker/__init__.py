import os

from flask import Flask, render_template, request, make_response, json

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/resize', methods=(['POST']))
    def resize():
        if 'image' not in request.files:
            return make_custom_response(400, 'error', 'No se incluyó la imagen.')

        file = request.files['image']
        if file.filename == '':
            return make_custom_response(400, 'error', 'No se incluyó la imagen.')

        if file and allowed_file(file.filename):
            print(file.filename)
            return make_custom_response(200, 'success', 'Ok')

    return app


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def make_custom_response(code, kind, msg):
    # Helper function for sending and receiving messages between client and server
    res = make_response(
        json.jsonify({
                "kind": kind,
                "message": msg
            }
        ),
        code,
    )
    res.headers["Content-Type"] = "application/json"

    return res
