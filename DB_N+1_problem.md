
# DB N+1 Problem

## 개요
**DB N+1 문제**는 데이터를 가져올 때 불필요하게 여러 번의 쿼리가 실행되는 비효율적인 상황을 말합니다. 이는 데이터베이스 성능을 저하시킬 수 있으며, 특히 ORM(Object-Relational Mapping) 환경에서 자주 발생합니다.

### N+1 문제의 흐름
1. 먼저, 1개의 쿼리로 기본 데이터를 가져옵니다. (여기서는 `User` 데이터를 가져오는 쿼리)
2. 각 기본 데이터에 대해 추가적인 관련 데이터를 가져오기 위해 N개의 쿼리가 실행됩니다. (예: 각 사용자의 게시글을 가져오기 위해 각각 쿼리를 실행)

이로 인해 총 **N+1번의 쿼리**가 실행되며, 데이터가 많아질수록 쿼리 실행 횟수가 기하급수적으로 증가합니다.

## 해결 방법
이를 해결하기 위해 `JOIN`을 사용하여 한 번의 쿼리로 모든 데이터를 가져오거나, ORM의 **Eager Loading**을 사용하여 필요한 데이터를 미리 로드할 수 있습니다.

## SQL JOIN 예시
```sql
SELECT User.*, Post.* 
FROM User
LEFT JOIN Post ON User.id = Post.user_id;
```
이 쿼리는 사용자 정보와 그들의 게시글 정보를 한 번에 가져옵니다.

---

## 예시 테이블과 결과

### User Table
| id | name    | age | city         |
|----|---------|-----|--------------|
| 1  | Alice   | 25  | New York     |
| 2  | Bob     | 30  | Los Angeles  |
| 3  | Charlie | 35  | Chicago      |

### Post Table
| user_id | title  | content              |
|---------|--------|----------------------|
| 1       | Post 1 | First post content   |
| 1       | Post 2 | Second post content  |
| 2       | Post 3 | Third post content   |

### Join Result
| id | name    | age | city        | title  | content              |
|----|---------|-----|-------------|--------|----------------------|
| 1  | Alice   | 25  | New York    | Post 1 | First post content   |
| 1  | Alice   | 25  | New York    | Post 2 | Second post content  |
| 2  | Bob     | 30  | Los Angeles | Post 3 | Third post content   |
| 3  | Charlie | 35  | Chicago     | NaN    | NaN                  |

### 설명
- **Alice (id = 1)**는 두 개의 게시글(Post 1, Post 2)을 가지고 있으며, 각각의 게시글 제목과 내용을 결과로 반환합니다.
- **Bob (id = 2)**는 하나의 게시글(Post 3)을 가지고 있으며, 해당 게시글 제목과 내용이 반환됩니다.
- **Charlie (id = 3)**는 게시글이 없기 때문에 `title`과 `content` 값은 `NaN`으로 표시됩니다.

이 예시는 `LEFT JOIN`을 통해 사용자 정보와 게시글 정보를 함께 가져오는 예시입니다. 이를 통해 N+1 문제를 해결하는 방법을 시각적으로 확인할 수 있습니다.
