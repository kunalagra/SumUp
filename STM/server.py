import sys
import os
from gunicorn.app.wsgiapp import run
if __name__ == '__main__':
    c1 = "python manage.py migrate"
    os.system(c1)
    sys.argv = "gunicorn --bind 0.0.0.0:5151 STM.wsgi".split()
    sys.exit(run())
