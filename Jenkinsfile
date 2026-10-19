pipeline {
  agent any

  environment {
    DOCKERHUB = credentials('dockerhub-creds')
    IMAGE = "yorilord/portfolio-backend"
  }

  stages {
    stage('Build image') {
      steps {
        sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest ./backend'
      }
    }

    stage('Push DockerHub') {
      steps {
        sh 'echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin'
        sh 'docker push $IMAGE:$BUILD_NUMBER'
        sh 'docker push $IMAGE:latest'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose down || true'
        sh 'docker compose up -d --build'
      }
    }
  }
}