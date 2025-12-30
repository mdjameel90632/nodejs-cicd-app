pipeline {
    agent any
    environment {
        IMAGE_NAME = "nodejs-cicd-app"
        ECR_REPO = "930142908403.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app"
        AWS_REGION = "us-east-1"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/mdjameel90632/nodejs-cicd-app'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm test || true' // Continue even if tests fail
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh 'sonar-scanner'
                    
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }
        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image ${IMAGE_NAME} || true' // Continue even if vulnerabilities are found
            }
        }
        stage('Push Image to AWS ECR') {
            steps {
                script {
                    sh '''
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                        docker tag ${IMAGE_NAME}:latest ${ECR_REPO}:latest
                        docker push ${ECR_REPO}:latest
                    '''
                }
            }
            
        }
        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh ec2-user@54.227.184.207"
                docker pull $ECR_REPO:latest &&
                docker stop nodeapp || true &&
                docker rm nodeapp || true &&
                docker run -d -p 3000:3000 --name nodeapp $ECR_REPO:latest
                "
                '''
            }
        }
    }
}