import os

from flask import Flask, render_template, request, make_response, json, send_file, Response
from PIL import Image, ImageOps
from io import BytesIO
from os.path import splitext

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_WIDTH = 1600

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
            filename = file.filename
            ext = splitext(filename)[1][1:]
            format = 'JPEG' if ext.lower() == 'jpg' else ext.upper()

            with Image.open(file) as im:
                # Resize and save to Bytes IO
                factor =  MAX_WIDTH / im.width
                resizedIm = ImageOps.scale(im, factor)
                bytesIm = BytesIO()
                resizedIm.save(bytesIm, format)
                bytesIm.seek(0)

        return send_file(bytesIm, attachment_filename=filename)
        # return Response(resizedIm,
        #                 status=200,
        #                mimetype="text/plain",
        #                headers={"Content-Disposition":
        #                             "attachment;filename=" + filename})

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
