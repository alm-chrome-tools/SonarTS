#!/bin/bash
set -euo pipefail


# if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

	SCANNER_VERSION=3.0.3.778-linux

	# Download SonarScanner
	mkdir -p sonar-scanner/download
	wget "https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SCANNER_VERSION}.zip" -O "sonar-scanner/download/sonar-scanner-cli-${SCANNER_VERSION}.zip"
	unzip "sonar-scanner/download/sonar-scanner-cli-${SCANNER_VERSION}.zip" -d sonar-scanner

	# complete the properties file with credentials
	echo sonar.host.url=$SONAR_HOST_URL >> sonar-project.properties
	echo sonar.login=$SONAR_TOKEN >> sonar-project.properties
	

	"./sonar-scanner/sonar-scanner-${SCANNER_VERSION}/bin/sonar-scanner"
# fi