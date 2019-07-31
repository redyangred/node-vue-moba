<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: { VueEditor },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //cursorLocation 光标位置
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$vueHttp.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        //修改
        res = await this.$vueHttp.put(`rest/articles/${this.id}`, this.model);
      } else {
        //新增
        res = await this.$vueHttp.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },
    async fetch() {
      const res = await this.$vueHttp.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$vueHttp.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
