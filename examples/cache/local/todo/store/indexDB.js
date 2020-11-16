const databaseName = 'project'
let version = 1
const keyList = ['project','task1','task2','member','extra']
const titleList = ['项目名称','task1','task2','参与人员','补充说明']
let db;
const openIndexDB = (optionList)=>{
  return new Promise((resolve,reject)=>{
    // 生成数据库请求对象，这个对象的 onsuccess监听事件用于拿到数据库对象
    let request = window.indexedDB.open(databaseName,version)
    request.onerror = function (event) {
      reject(event)
    };
    request.onsuccess = function (event) {
      let hasData = !!request.transaction
      console.log('数据连接成功',request);
      db = request.result;
      // 将数据库对象返回出去
      resolve(db)
    };
    // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
    request.onupgradeneeded = function (event) {
      // 拿到新的数据库实例
      db = event.target.result;
      // 在数据库下创建表，用于存储具体的数据
      let objectStore = db.createObjectStore(databaseName, { 
          keyPath: 'id',
          autoIncrement: true
      });
      // 定义表中字段名，并且以 id 作为key值
      objectStore.createIndex('id', 'id', {
          unique: true    
      });
      for (let option of optionList){
        // objectStore.createIndex(indexName, keyPath) 索引名称,索引使用的关键路径
        objectStore.createIndex(option,option)
      }
      resolve(db)
    }
  })
}
const getObjectStore = db=> {
  return new Promise(resolve=>{
    let transaction = db.transaction([databaseName], "readwrite")
    const objectStore = transaction.objectStore(databaseName)
    resolve(objectStore)
  })
}
const showAllStore = (objectStore)=>{
  const list = []
  return new Promise(resolve=>{
    // IDBCursor 对象代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录。
    let IDBCursor = objectStore.openCursor()
    IDBCursor.onsuccess = function(event) {
      const cursor = event.target.result;
      // 如果游标没有遍历完，继续下面的逻辑
      if (cursor) {
          list.push(cursor.value)
          // 继续下一个游标项
          cursor.continue();
        } else {
        // 如果全部遍历完毕
        resolve(list)
      }
    }
  })
}
const addStore = (objectStore,options)=>{
  return new Promise((resolve,reject)=>{
     // 将要添加的对象添加到表中，对象中包含表中的字段
     const objectStoreRequest = objectStore.add(options);        
     objectStoreRequest.onsuccess = function(event) {
       resolve('成功')
     };
  })
}
const deleteStore = (objectStore,id)=>{
  return new Promise(resolve=>{
    const objectStoreRequest = objectStore.delete(id);
    // 删除成功后
    objectStoreRequest.onsuccess = function() {
        resolve('已删除')
    };
  })
}
const editStore = (objectStore,id,options)=>{
  return new Promise(resolve=>{
    // 获取存储的对应键的存储对象
    const objectStoreRequest = objectStore.get(id);
    // 获取成功后替换当前数据
    objectStoreRequest.onsuccess = function(event) {
        // 当前数据
        const myRecord = objectStoreRequest.result;
        // 更新数据库存储数据                
        objectStore.put(Object.assign(myRecord,options));
        resolve('更新成功')
    };
  })
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      project:'',
      task1:'',
      task2:'',
      member:'',
      extra:'',
      index:0,
      current:'',
      indexedDBList:[],
      selectedIndex:'',
      selectedId:'',
    }
    this.onFetchByIdClick = this.onFetchByIdClick.bind(this)
    this.onFetchByKeyClick = this.onFetchByKeyClick.bind(this)
    this.onCreateClick = this.onCreateClick.bind(this)
  }
  async onCreateClick(){
    // 获取数据库对象
    // db = await openIndexDB(keyList)
    // 获取 objectStore 可以理解为表
    let objectStore = await getObjectStore(db)
    let { project,task1,task2,member,extra} = this.state
    let params = { project,task1,task2,member,extra }
    for(let key in params){
      if(!params[key]){
        delete params[key]
      }
    }
    await addStore(objectStore,params)
    // 创建以后重新查询所有数据
    this.getAllData(objectStore)
  }
  async onFetchClick(){
    // 获取 objectStore 可以理解为表
    let objectStore = await getObjectStore(db)
    // 如果是数字指向 id 查询，如果是字符串安装key值查询
    if(isNaN(this.state['index'])){
      this.onFetchByKeyClick(objectStore)
    }else{
      this.onFetchByIdClick(objectStore)
    }
  }
  async ondeleteById(id){
    let objectStore  = await getObjectStore(db)
    await deleteStore(objectStore,id)
    this.getAllData(objectStore)
  }
  async onFetchByIdClick(objectStore){
    let request = objectStore.get(Number(this.state['index']))
    let _this = this
    // 异步的过程
    request.onsuccess = function(event){
      // request.result 或 event.target.result 去获取取出的值
      _this.setState({
        current:event.target.result
      })
    }
  }
  async onFetchByKeyClick(objectStore){
    console.log('index:',objectStore.index(this.state['index']))
    // IDBIndex 对象 代表数据库的索引，通过这个对象可以获取数据库里面的记录
    let index = objectStore.index(this.state['index'])
    // 查询表中，包含该字段值为该值的行，相当于 where 操作 
    // 获取表中包含该字段的所有值
    let request = index.getAll()
    let _this = this
    request.onsuccess = function(e){
      let result = e.target.result
      console.log('result:',result)
      _this.setState({
        current:result
      })
    }
  }
  async getAllData(objectStore){
    let list = await showAllStore(objectStore)
    console.log('getData',list)
    this.setState({
      indexedDBList:list
    })
  }
  // 通过id来删除对应的内容
  async onClose(index){
    this.ondeleteById(index)
    this.setState({selectedIndex:''})
  }
  async onContentClick(id,index){
    console.log('id',id,index);
    this.setState({
      selectedIndex:index,
      selectedId:id
    })
  }
  async onEditByIdClick(){
    let objectStore  = await getObjectStore(db)
    let { project,task1,task2,member,extra,selectedId} = this.state
    let params = { project,task1,task2,member,extra }
    for(let key in params){
      if(!params[key]){
        delete params[key]
      }
    }
    // 指定id去修改数据
    objectStore.put( {...params,id:selectedId})
    this.getAllData(objectStore)
  }
  async componentDidMount(){
    // 创建 db 或 更新db
    let db = await openIndexDB(keyList)
    // 创建事务，理解为拿到表对象
    let objectStore = await  getObjectStore(db)
    // 拿到所有数据
    this.getAllData(objectStore)
  }
  render() {
    const { indexedDBList ,current,selectedIndex} = this.state
    return (
      <div className="flex">
        <div>
          {
            keyList.map((key,index)=>{
              return (
                <div key={index}>
                <span>{ titleList[index] } :</span>
                <input onChange={event=>{this.setState({
                  [key]:event.target.value
                }) }} />
                </div>
              )
            })
          }
          <div>
          <span>项目名称：</span>
          <input onChange={event=>{this.setState({
            project:event.target.value
          }) }} />
          </div>
        <button onClick={this.onCreateClick.bind(this)}>确认创建</button>
        <button onClick={this.onEditByIdClick.bind(this)}>确认修改</button>
          
        </div>
        <div className="line"/>
        <div>
        👇点击下面选项，出现选中框后，在左侧修改文案，点击 确认修改 进行修改
          {
           indexedDBList.length>0? (indexedDBList.map((item,index)=> <p style={index===selectedIndex?{border:'1px dashed #f66'}:null} key={index} onClick={this.onContentClick.bind(this,item.id,index)}>{JSON.stringify(item)} <span className="close" onClick={this.onClose.bind(this,item.id)}> x </span> </p>)): <div style={{color:'red',textAlign:'center'}}>暂无数据</div>
          }
        </div>
        <div className="line"/>
        
        <div>
          <input onChange={event=>{this.setState({index:event.target.value})}} placeholder="请输入id序号或者键名" />
          <button onClick={this.onFetchClick.bind(this)}>取出该数据</button>
          {
            current?( <div>  { Array.isArray(current)? (current.map((item,index)=> <div key={index}>{JSON.stringify(item)}</div>)) : JSON.stringify(current) }</div>): <div> 未找到对应数据</div>
          }

        </div>
      </div>
    );
  }
}


ReactDOM.render(
    <App  />,
    document.getElementById('root')
 );