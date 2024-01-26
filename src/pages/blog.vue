<script setup lang="ts" generic="T extends any, O extends any">
const blogs = [
  { name: '[Vue3] 使用MarkDown文件做页面', link: 'code-repo-exchange' },
  {
    name: '代码仓库迁移：从 Github 到 Gitee',
    link: 'code-repo-exchange',
  },
]
</script>

<template>
  <div class="profile" mt-2 text-left>
    <h2 font-size-8 class="sub-title">
      Blogs
    </h2>
    <div class="collection" z-1 flex flex-col justify-start>
      <p v-for="x in blogs" :key="x.name" flex="~">
        <AppLink :to="x.link">
          {{ x.name }}
        </AppLink>
      </p>
    </div>
  </div>
</template>

<style>
.profile {
  width: 80%;
  max-width: 1024px;
  line-height: 1.75;
}

.profile p {
  margin-top: 1.5rem;
}

.profile a {
  font-weight: inherit;
  text-decoration: none;
  transition: border 0.3s ease-in-out;

  display: flex;
  align-items: center;
}

.profile .collection {
  margin-top: 1rem;
}

.profile .collection p {
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
}
</style>
