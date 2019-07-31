
module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true
  });

  //创建分类
  router.post('/', async (req, res) => {
    //接收客户端的数据json
    const model = await req.Model.create(req.body)
    //返回给客户端
    res.send(model)

  })
  //分类列表
  router.get('/', async (req, res) => {

    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    //接收客户端的数据json
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    //返回给客户端
    res.send(items)

  })

  //编辑信息查询
  router.get('/:id', async (req, res) => {
    //接收客户端的数据json
    const model = await req.Model.findById(req.params.id)
    //返回给客户端
    res.send(model)

  })
  //编辑接口
  router.put('/:id', async (req, res) => {
    //接收客户端的数据json
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    //返回给客户端
    res.send(model)

  })

  //删除信息
  router.delete('/:id', async (req, res) => {
    //接收客户端的数据json
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    //返回给客户端
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  //__dirname 绝对地址
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {

    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

}