<template>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="post-header">
        <div>
            <div class="post-thumbnail">
                <img src="@/assets/img/2.jpg" alt="Post Preview">
            </div>
        </div>
        <div class="post-details">
            <div class="post-title">
                <div>
                    <h1>文章测试</h1>
                    <hr class="thick-hr">
                </div>
                <div class="post-meta">
                    <div class="meta-item">
                        <CalendarIcon />
                        <p>2023-05-05</p>
                    </div>
                    <div class="meta-item">
                        <BookmarkDoubleIcon />
                        <p>分类</p>
                    </div>
                    <div class="meta-item">
                        <HashtagIcon />
                        <p>标签</p>
                    </div>
                    <div class="meta-item">
                        <p>阅读量</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { CalendarIcon, BookmarkDoubleIcon, HashtagIcon } from 'tdesign-icons-vue-next'
</script>

<style scoped>
.post-header {
    width: 1045px;
    height: 300px;
    background-color: var(--background-color);
    display: flex;
    box-shadow: 0 0 4px rgba(194, 194, 194, 0.497);
    border-radius: 10px;
    margin: 10px;
}

.post-details {
    margin-left: 30px;
    margin-top: 20px;

}

.post-header img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
}

.post-title {
    display: flex;
    flex-direction: column;
}

.thick-hr {
    border: none;
    height: 5px;
    background-color: rgb(255, 173, 173);

}

.post-meta {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 20px;

}

.post-meta p {
    font-size: 16px;

}

.post-meta svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.meta-item {
    display: flex;
}
</style>