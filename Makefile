install:
		npm install
lint:
		./node_modules/.bin/eslint . --fix
radd:
	react-native run-android
rios:
	react-native run-ios
utest:
	npm run utest