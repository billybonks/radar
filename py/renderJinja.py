from sys import argv
from jinja2 import Template
import json


def renderJinja(tempalteStr, varsString):
  tempalte = Template(tempalteStr)
  vars = json.loads(varsString)
  return tempalte.render(vars)

if __name__ == '__main__':
    print(renderJinja(argv[1], argv[2]))