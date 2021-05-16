import os, tempfile
from os.path import splitext, join
from flask import Flask, render_template, request, make_response, json, send_file, Response, redirect, url_for, g
from PIL import Image, ImageOps
from io import BytesIO
from math import ceil
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_WIDTH = 1600
UPDIR = join('.', 'coverMaker', 'static', 'uploads')

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

            # Save filename on g to access it on template
            g.file = filename

            ext = splitext(filename)[1][1:]
            format = 'JPEG' if ext.lower() == 'jpg' else ext.upper()

            with Image.open(file) as im:
                # Resize and save to Bytes IO
                factor =  MAX_WIDTH / im.width
                resizedIm = ImageOps.scale(im, factor)

                resizedIm.save(join(UPDIR, filename), format)
                print(url_for('static', filename=join('uploads', g.file)))

            return make_custom_response(200,
                                        'src',
                                        url_for('static', filename=join('uploads', g.file)))


    @app.route('/crop', methods=(['POST']))
    def crop():
        # Crop an image received in a form, save it
        # and return the cropped image filepath to serve it to the client

        form = request.form
        original = form['imageName']
        if not original:
            return make_custom_response(400, 'error', 'Hubo un error, intenta de nuevo')
        upper = form['upper']
        lower = form['lower']

        with Image.open(join(UPDIR, original)) as im:
            width, height = im.size
            print(f"height: {height}")

            topCrop = ceil(height * float(upper))
            print(f"top: {topCrop}")
            botCrop = height - ceil(height * float(lower))
            print(f"bot: {botCrop}")
            cropIm = im.crop((0, topCrop, width, botCrop))
            cropIm.save(join(UPDIR, 'cropped' + original))

        return make_custom_response(200,
                                    'src',
                                    url_for('static', filename=join('uploads',
                                                                    'cropped' + original)))

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
