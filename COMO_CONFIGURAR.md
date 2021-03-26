A partir de esta plantilla, solo hace falta crear un ambiente virtual para
empezar a correr una aplicacion.

Sigue estos pasos:

  1. Dirigete a "./src/"
  2. Cambia el nombre del directorio "your_project_name/" al nombre que elijas
     darle a la app de Flask. Usaras este nombre en el paso 6.
  3. En ese mismo directorio ("src/") crea un ambiente virtual de python con el
     comando: "python3 -m venv <venv>".
        Nota: <venv> puede llevar cualquier nombre. Tu lo eliges.
  4. Activa el ambiente virtual con el comando:
        - . <nombre_de_tu_venv>/bin/activate
        Nota: Presta atencion al punto del principio. Debes incluirlo.
  5. Con el ambiente virtual activado, instala los requisitos con el comando:
        - pip3 install -r ../requirements.txt
  6. Crea variables de sistema necesarias para la app con los siguientes comandos.
        - export FLASK_APP=<nombre_del_directorio_que_elegiste>
        - export FLASK_ENV=development
        Nota: FLASK_ENV puedes cambiarlo luego. "development" es nada mas un punto de partida.
  7. Corre la app de flask con "flask run". Ve a la ip que te indica la consola.
     Si todo salio bien, veras el mensaje "Hello World".
    
