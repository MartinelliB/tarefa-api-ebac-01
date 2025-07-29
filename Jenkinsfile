pipeline {
    agent any

    stages {
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }

        stage('Subir servidor') {
            steps {
                bat 'start /b npm start'
            }
        }

        stage('Executar Testes da API') {
            steps {
                bat 'npm test'
            }
        }
    }
}
