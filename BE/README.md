# side-review
side project - review site

# 스타일 가이드 Intellij 적용
Settings/Preferences | Editor | Code Style | Kotlin 으로 이동. \
Set from... 선택 \
Kotlin style guide 선택.

# Document indexing 방법
서버 첫 실행 시 실행되는 IndexInitializer와 12시에 실행되는 Scheduler 함수를 이용해 로컬에서 Document를 삭제하고, 재 indexing하는 방법
1. IndexInitializer에 service.delete("인덱스명") 추가
2. SchedulerSvcTest에서 원하는 인덱스의 insert 함수 실행
3. **IndexInitializer에 service.delete("인덱스명") 삭제** 반드시 해야함
