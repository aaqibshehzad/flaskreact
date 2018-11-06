virtualenv env
%~dp0\env/scripts/activate
pip install -r requirements.txt
cd static
npm install
