const { MongoClient } = require('mongodb');
const uri  = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
    try{
        //디비 서버 연결
        await client.connect(); 

        //디비 및 컬렉션 선택
        const database = client.db('testdb'); //디비 이름 //만약에 디비가 없다면 자동으로 생성한다.
        const collection = database.collection('users'); //컬렉션 이름 // 컬렉션도 마찬가지로 없는 경우 자동으로 생성된다.

        //1. Create
        const newUser = { name : "John Doe", age : 30, city : 'Newyork'};
        const result = await collection.insertOne(newUser);
        console.log(`새로운 사용자 삽입됨 : ${result.insertedId}`);

        //2. Read
        const query = { name : 'John Doe'}; //특정 조건으로 조회
        const user = await collection.findOne(query);
        console.log(`조회된 사용자 : `, user);

        //3. Update
        const update = { $set : { age : 31 }}; //나이 업데이트
        const updateResult = await collection.updateOne(query, update);
        console.log(`${updateResult.modifiedCount}개의 문서가 업데이트 됨`);

        // 4. Delete
        const deleteResult = await collection .deleteOne(query);
        console.log(`${deleteResult.deletedCount}개의 문서가 삭제됨`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
