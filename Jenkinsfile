pipeline {
    agent any
    stages {
        stage('build container') {
            steps {
                sh 'docker build --tag=client .'
            }
        }

        stage('publish') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'nexus', usernameVariable: 'nexusUser', passwordVariable: 'nexusPass')]) {
                    sh 'docker login nexus.local:8080 --username $nexusUser --password $nexusPass'
                }
                sh 'docker image tag client nexus.local:8080/rhink/client:latest'
                sh 'docker image push nexus.local:8080/rhink/client:latest'
            }
        }

        stage('deploy') {
            steps {
                // stop and remove old client container. "||" prevents failure of stop command from failing build.
                sh 'docker stop temperature_client || true && docker rm temperature_client || true'
                sh 'docker run --name temperature_client --restart always --detach -p 192.168.1.202:80:8080 client'
            }
        }
    }
}
