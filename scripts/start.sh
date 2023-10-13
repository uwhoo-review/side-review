#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/app/BE"
JAR_FILE="$PROJECT_ROOT/spring-webapp.jar"
ENV_PATH="$PROJECT_ROOT/.env"


# 함수를 사용하여 .env 파일을 읽고 환경 변수로 설정하는 부분
read_env_file() {
  while IFS= read -r line; do
    export "$line"
  done < "$ENV_PATH"
}


APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"

TIME_NOW=$(date +%c)

# .env 파일 로드
echo "$TIME_NOW > .env 파일 로드" >> $DEPLOY_LOG
if [ -f "$ENV_PATH" ]; then
  read_env_file
else
  echo "$TIME_NOW > .env 파일이 존재하지 않습니다." >> $DEPLOY_LOG
fi


# build 파일 복사
echo "$TIME_NOW > $JAR_FILE 파일 복사" >> $DEPLOY_LOG
cp $PROJECT_ROOT/build/libs/*.jar $JAR_FILE

# jar 파일 실행
echo "$TIME_NOW > $JAR_FILE 파일 실행" >> $DEPLOY_LOG
nohup java -jar $JAR_FILE > $APP_LOG 2> $ERROR_LOG &

CURRENT_PID=$(pgrep -f $JAR_FILE)
echo "$TIME_NOW > 실행된 프로세스 아이디 $CURRENT_PID 입니다." >> $DEPLOY_LOG
