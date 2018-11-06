virtualenv env
call %~dp0\env/scripts/activate
pip install -r requirements.txt
cd static
call npm install
cd..
