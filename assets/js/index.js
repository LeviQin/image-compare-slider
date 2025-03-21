document.addEventListener('DOMContentLoaded', () => {
    /**
     * 初始化通过剪裁实现图像对比的功能
     * @param {Object} doms - 包含所需DOM元素的对象
     *  - barBtn: 滑动按钮元素
     *  - barLine: 滑动线条元素
     *  - clipContainer: 剪裁容器元素
     *  - newImg: 被剪裁的图片元素
     */
    function initClip(doms) {
        // 解构赋值获取所需的DOM元素
        const { barBtn, barLine, clipContainer, newImg } = doms;
        // 定义变量以跟踪鼠标或触摸是否在拖动
        let isDragging = false;
        let isMDragging = false;

        /**
         * 更新图片剪裁位置
         * @param {number} x - 鼠标或触摸在剪裁容器上的x坐标
         */
        function updateImageClip(x) {
            requestAnimationFrame(() => {
                // 计算剪裁容器的宽度
                const containerWidth = clipContainer.offsetWidth;
                // 计算并限制剪裁的百分比
                const percent = Math.min(Math.max(x / containerWidth, 0), 1);
                // 更新图片的剪裁路径
                newImg.style.clipPath = `inset(0 ${100 - percent * 100}% 0 0)`;
                // 更新滑动按钮和线条的位置
                barBtn.style.left = `${percent * 100}%`;
                barLine.style.left = `${percent * 100}%`;
            });
        }

        // 添加鼠标按下事件监听器到滑动按钮
        barBtn.addEventListener("mousedown", (e) => {
            // 开始拖动并阻止默认行为
            isDragging = true;
            e.preventDefault();
        });

        // 添加鼠标抬起事件监听器到文档
        document.addEventListener("mouseup", () => {
            // 结束拖动
            isDragging = false;
        });

        // 添加鼠标移动事件监听器到文档
        document.addEventListener("mousemove", (e) => {
            // 如果正在拖动，则更新图片剪裁
            if (isDragging) {
                const x = e.clientX - clipContainer.getBoundingClientRect().left;
                updateImageClip(x);
            }
        });

        // 添加点击事件监听器到剪裁容器
        clipContainer.addEventListener("click", (e) => {
            // 点击时更新图片剪裁
            const x = e.clientX - clipContainer.getBoundingClientRect().left;
            updateImageClip(x);
        });

        // 添加触摸开始事件监听器到滑动按钮
        barBtn.addEventListener("touchstart", (e) => {
            // 开始拖动并阻止默认行为
            isMDragging = true;
            e.preventDefault();
        });

        // 添加触摸结束事件监听器到文档
        document.addEventListener("touchend", () => {
            // 结束拖动
            isMDragging = false;
        });

        // 添加触摸移动事件监听器到文档
        document.addEventListener("touchmove", (e) => {
            // 如果正在拖动，则更新图片剪裁
            if (isMDragging) {
                const touch = e.touches[0];
                const x = touch.clientX - clipContainer.getBoundingClientRect().left;
                updateImageClip(x);
            }
        });
    }

    initClip({
        barBtn: document.getElementById(`barBtn`),
        barLine: document.getElementById(`barLine`),
        clipContainer: document.getElementById(`clipContainer`),
        newImg: document.getElementById(`newImg`),
    });
});