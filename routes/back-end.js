var express = require("express");
var _ = require("lodash");
var router = express.Router();
var Model_KichBan = require("../model/model_kichban");
var Model_Tag = require("../model/model_tag");

/* Thêm kịch bản */
router.post("/kich-ban", async function (req, res, next) {
  console.log("DATA: ", Object.keys(req.body)[0]);
  let requestData = JSON.parse(Object.keys(req.body)[0])
  let tagList = [];
  for (let tag of requestData.tags) {
    await addTag(tag);
    tagList.push(tag.toLowerCase())
  }
  let kichban = {
    title: requestData.title,
    content: requestData.content,
    author: requestData.author,
    like: requestData.like,
    tag: tagList
  }
  await Model_KichBan.create(kichban)
  return res.json({ message: "Thành công" });
});
/* Sửa kịch bản */
router.put("/kich-ban", async function (req, res, next) {
  console.log("DATA Kịch bản mới: ", Object.keys(req.body)[0]);
  let requestData = JSON.parse(Object.keys(req.body)[0])
  let tagList = [];
  for (let tag of requestData.tags) {
    await addTag(tag);
    tagList.push(tag.toLowerCase())
  }
  let kichban = {
    title: requestData.title,
    content: requestData.content,
    author: requestData.author,
    like: requestData.like,
    tag: tagList
  }
  console.log("Kịch bản mới: ", requestData.id, kichban);
  let result = await Model_KichBan.findOneAndUpdate({ _id: requestData.id }, kichban)
  console.log("KẾt quả: ", result);
  return res.json({ message: "Thành công", data: result });
});
/* Lấy kịch bản chi tiết */
router.get('/kich-ban', async function (req, res) {
  let id = req.query.id
  console.log("ID found: ", id);
  let scriptData = await Model_KichBan.findOne({ _id: id })
  return res.json({ data: scriptData });
})


router.post("/lay-kich-ban", async function (req, res, next) {
  let tagList = [];

  let requestData = JSON.parse(Object.keys(req.body)[0])
  console.log("DATA: ", requestData);
  for (let tag of requestData.tag) {
    tagList.push(tag.toLowerCase())
  }
  let result = null;
  console.log("Tag list: ", tagList)
  if (tagList.length == 0) {
    result = await Model_KichBan.find()
  }
  else result = await Model_KichBan.find({ tag: { $all: tagList } })
  return res.json({ message: "Thành công", data: result });
});

router.get("/tags", async function (req, res, next) {
  let tagList = await Model_Tag.find({}).sort({ title: 1 });
  res.json({ data: tagList });
})
// THêm tag nếu chưa tồn tại
async function addTag(title) {
  let isExist = await Model_Tag.find({ title: title.toLowerCase() });
  if (isExist.length > 0) {
    return { message: `Tag  ${title} đã tồn tại` }
  }
  else {
    await Model_Tag.create({ title: title.toLowerCase() })
    return { message: `Tạo tag  ${title} thành công` }

  }
}

module.exports = router;
