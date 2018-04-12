import json
import os
import csv

from app import app
from flask import Flask, request

debug = False

@app.route('/')
def root():
	return app.send_static_file('index.html')

@app.route('/list')
def _list():
	datalist = [name for name in os.listdir("app/data")]
	
	if ".DS_Store" in datalist:
		datalist.remove(".DS_Store")
		
	return json.dumps(datalist)

@app.route('/data/<dataname>')
def _data(dataname):
	# data preprocessing
	fpath = 'app/data/' + dataname
	with open(fpath) as file:
		rows = file.readlines()
		print(rows)
	
	return json.dumps(rows)
