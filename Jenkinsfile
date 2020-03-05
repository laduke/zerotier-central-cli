pipeline {
    agent {
        dockerfile {
            args '-v $HOME/.npm:/npm'
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('install') {
            steps {
                sh 'npm --version'
                sh 'node --version'
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                sh 'npm -s test | tee ./report.tap'
                step([$class: "TapPublisher", testResults: "**/*.tap"])
            }
        }

        stage('build') {
            when { branch "master" }
            steps {
                sh 'npm -s run build'
                sh 'npm -s run build:win'
                // sh 'npm -s run build:deb' // tries to chown -R root {workpspace} and it's not allowed
                // sh 'npm -s run build:macos' // must be run from macos
            }
        }

        stage('deploy') {
            when { allOf { branch "master"; tag "v*.*.*"} }
            steps {
                echo 'deploy script goes here'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'dist/**/*.{tar.gz,exe,apt}', onlyIfSuccessful: true, fingerprint: true
                }
            }
        }

    }
}
