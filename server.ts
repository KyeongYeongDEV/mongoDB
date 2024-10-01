import { MongoClient, Db, Collection, InsertOneResult, UpdateResult, DeleteResult, Document } from 'mongodb';

// MongoDB 연결 URI
const uri: string = "mongodb://localhost:27017";

// MongoClient 생성
const client: MongoClient = new MongoClient(uri);

async function run(): Promise<void> {
try {
    // MongoDB 서버에 연결
    await client.connect();
    
    // 데이터베이스 및 컬렉션 선택
    const database: Db = client.db('testdb'); // 'testdb' 데이터베이스
    const collection: Collection<Document> = database.collection('users'); // 'users' 컬렉션

    // 1. Create (데이터 삽입)
    const newUser = { name: "John Doe", age: 30, city: 'New York' };
    const insertResult: InsertOneResult = await collection.insertOne(newUser);
    console.log(`새로운 사용자 삽입됨: ${insertResult.insertedId}`);

    // 2. Read (데이터 조회)
    const query = { name: 'John Doe' };
    const user = await collection.findOne(query);
    if (user) {
    console.log('조회된 사용자: ', user);
    } else {
    console.log('사용자를 찾을 수 없습니다.');
    }

    // 3. Update (데이터 수정)
    const update = { $set: { age: 31 } }; // 나이 수정
    const updateResult: UpdateResult = await collection.updateOne(query, update);
    if (updateResult.modifiedCount > 0) {
    console.log(`${updateResult.modifiedCount}개의 문서가 업데이트 됨`);
    } else {
    console.log('업데이트된 문서가 없습니다.');
    }

    // 4. Delete (데이터 삭제)
    const deleteResult: DeleteResult = await collection.deleteOne(query);
    if (deleteResult.deletedCount > 0) {
        console.log(`${deleteResult.deletedCount}개의 문서가 삭제됨`);
    } else {
        console.log('삭제된 문서가 없습니다.');
    }

} finally {
    // 연결 종료
    await client.close();
}
}

// 실행
run().catch(console.dir);
