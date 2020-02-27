pipeline {
    agent { docker { image 'node:dubnium-alpine' } }
    environment {
        HOME = '.'
    }
    stages {
        stage('install') {
            steps {
                sh 'npm --version'
                sh 'node --version'
                sh 'npm ci'
            }
        }

        stage('test') {
            steps {
                sh 'npm -s test | tee ./report.tap'
                step([$class: "TapPublisher", testResults: "**/*.tap"])
            }
        }

/* npm build works, but not on this jenkins/docker file yet.
        stage('buil') {
            steps {
                sh 'npm -s run build'
            }
        }
*/
    }
}