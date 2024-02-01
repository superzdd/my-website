# [AI微信二维码] Stable Diffusion生成二维码初探

最近在研究使用Stable Diffusion生成二维码有了一些成果，先上图

> 下面每张图里都包含了一个我自己的微信二维码，可以微信扫一扫尝试。
> _所有图片的Prompts详见文章最后附录_

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01661-685635532.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01682-4137445243.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01708-2583313787.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01714-2425333477.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01824-2292622729.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01952-2866753143.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01961-2866753152.png"/>

<img style="width:300px; height:auto;" src="/blogs/qrcode/wx-qrcode.png"/>

> 原版二维码

PS： 最后两个`AI微信码`只能通过微信扫一扫识别，微信长按不识别

### 读前须知

以下内容需要读者对`Stable Diffusion`有一个基本的认识，否则其中的概念很生涩会影响阅读体验。如果你还不了解`Stable Diffusion`，但对它很感兴趣，我强烈推荐去看[B站第一套系统的AI绘画课！零基础学会Stable Diffusion，这绝对是你看过的最容易上手的AI绘画教程 | SD WebUI 保姆级攻略](https://www.bilibili.com/video/BV1As4y127HW/?spm_id_from=333.788&vd_source=4fd973d19cb5506a7c9f2d59e8ab5165)，相信你一定也会迈进AI绘画的大门。

## 制作方法&经验分享

制作原理本身并不难理解，就是**使用ControlNet控制图片生成**。

### 原理：使用ControlNet生成二维码

在ControlNet中，启用名为`qrcode_monster`的模型即可，该方法在文生图，图生图中都适用。~（模型下载在文章最后）~

<img style="width:300px; height:auto;" src="/blogs/qrcode/controlnet-qrmonster.png" alt="启用qrcode_monster，同时请注意完美像素模式和预处理器的选项也要正确"/>

但是，仅启用`qrcode_monster`而不作其他配置是得不到很好的出图效果的，甚至大量抽卡也出不了一张好图。

下面这些建议，是我经过三个晚上反复测试得到的一些经验，希望在往后作图时少走些弯路：

> 1. 二维码最重要
> 2. 人物生成需耐心
> 3. 其他参数推荐

### 1. 二维码最重要

原始二维码最重要！原始二维码最重要！原始二维码最重要！
二维码的底子好不好，直接决定了抽卡的次数，决定了你能不能按时睡觉，能不能在起床后看到满意的成品

二维码的好坏由这几点构成：

1. 降低二维码复杂度
2. 将二维码的黑白像素分布均匀
3. 选择与主题的契合度高的二维码样式
4. 其他

##### 1.1. 降低二维码复杂度

二维码越复杂，AI生成的图片就越难满足要求。
因为内容和复杂程度成正比，内容越多，二维码就越复杂，而且尺寸也会更大。

示例：

简单文本：

纯文本：superzdd

<img style="width:300px; height:auto;" src="/blogs/qrcode/plain-text-superzdd.png" alt="superzdd"/>

超长文本：

<img style="width:300px; height:auto;" src="/blogs/qrcode/lord-of-ring.png" alt="superzdd"/>

二维码里黑白格子密度太高，将导致图片生成受控太多，不仅出不来想要的效果，而且更容易使物体变形，错位。像上面这个超长文本，AI不可能画出好看的内容。

所以，

> 要尽量降低二维码的复杂程度，就必须将内容简化。

- 比如最常见的url链接，可采用**短链接**的形式来代替。
- 微信这种官方链接，建议不要短链接，以免造成不可识别的风险。

##### 1.2. 将二维码的黑白像素分布均匀

二维码的黑白像素最好能均匀分布，应尽量避免**大面积黑色/白色堆积**的情况，考虑到两方面因素

- 大面积色块会导致二维码无法精确识别像素位置，增大识别不出的风险
- 大面积色块会导致AI会在这个区域重点绘画，但可能会破坏画面平衡

所以，

> 大面积色块应尽量控制在**边缘区域**，除非你有意使用大面积色块，比如想突出某些区域。

但是，怎么才能控制大面积色块呢？二维码不是固定不变的吗？
难道我需要不停变换短网址，直到生成我满意的位置吗？
其实，二维码有**`八种`**生成方式（对应八个掩码），但常见的二维码生成器只提供一种，并不会有很多选择，比如：[草料二维码](https://cli.im/)
直到我遇见了[这个网站](https://qrcode.antfu.me/)，才豁然开朗。在这个网站中，你可以比较这8种方式生成的二维码的区别，最后选一个看起来最优的最为最终`ControlNet`参考图片：

<img style="width:800px; height:auto;" src="/blogs/qrcode/mask-pattern.png" alt="superzdd"/>

当然，`八种`都要也是可以的~

PS: 最近成了`Anthony Fu`的粉丝，大佬手撸的工具真的太强

##### 1.3. 选择与主题的契合度高的二维码样式

二维码总是方块形状的，这样对于题材发挥其实很不利，比如，篮球，汽车，耳机这类图片，更容易联想到圆形而不是正方形。比如：
<img style="width:300px; height:auto;" src="/blogs/qrcode/bad/02858-1149952677.png" alt="superzdd"/>

要生成这类的二维码，还是需要[这个网站](https://qrcode.antfu.me/)
<img style="width:800px; height:auto;" src="/blogs/qrcode/qrcode-shape.png" alt="superzdd"/>

为了让AI能顺利达到想要的效果，

> 建议提前准备**4~5个不同样式的二维码**，切换着使用，以测试哪个最终符合自己想要的效果。

此外，据[Stable Diffusion QR Code 101](https://antfu.me/posts/ai-qrcode-101#selective-multi-layer-control)提到的，二维码无法识别的主要原因：

> Other than the position markers that are obvious to find, we can see there are also the **Version and Format information** around the position markers.  
> Now we realize that many QR Code that are not scannable are because **those area are not distinguishable enough**, causing the scanner to exit early before going into the actual data.

文章不仅提到了主因，还贴心得给出了解法。我觉得这是一个很棒的结论，后续我会用这个依据尝试提高二维码的成功率

##### 1.4. 其他

参考这样的图片，需要准备这样的二维码：

<img style="width:800px; height:auto;" src="/blogs/qrcode/antfu-1.png" alt="antfu"/>
> copy from https://antfu.me/posts/ai-qrcode-101

<img style="width:800px; height:auto;" src="/blogs/qrcode/qrcode-custom.png" alt="qrcode-custom"/>

实测下来，生成效果堪忧。即使图片大片留白，给了AI更大的绘画空间，但实际效果乏善可陈，只能说明留白并不能是AI作画更容易，其中还有许多参数需要调整。由于质量太差，我就不放图片了

### 2. 人物生成需耐心

在生成人物时，目前结果为：

- 人物走样，二维码可扫出的概率：**25%**
- 人物大致OK，二维码能扫出的概率：**6%**

以下这些情况在出图时，是经常发生的：多头，多手，姿势扭曲，局部扭曲等：

<img style="width:800px; height:auto;" src="/blogs/qrcode/bad/bad-merge.png"/>

另外，当前女孩之外的`checkpoint`和`lora`也不多，即便在没有二维码的影响下，也不一定能出好图。何况下载，调试，预抽卡都需要时间，导致真正能出一组效果过得去的二维码也要花费不少心力，这不是一个立马见效的流程。

所以，在想好要生成人物的时候，首先：

1. 要有耐心，做好3,4天调试细节，不断试错的准备
2. 每批最好出4张图，保证其中一张可以扫二维码，不然就调整参数重来，否则批量抽卡时很难保证二维码和人都同时正确。
3. 人物动作和扭曲在二维码加持下，比正常出图错误率要高得多。这种情况下推荐修改 `引导介入时机`和`迭代步数` - `引导介入时机`和`步数`可以同时增加，为的是在`ControlNet`介入前，尽量将人的肢体草稿画好。- `引导介入时机`尝试从`0.1`开始递增，`迭代步数`尝试从`40`开始递增 - 但不要轻易增加`CFG Scale`，建议仍然保持`7`。

   <img style="width:800px; height:auto;" src="/blogs/qrcode/controlnet-start.png"/>
    
   <img style="width:800px; height:auto;" src="/blogs/qrcode/steps.png"/>

### 3. 其他参数推荐

#### 3.1. CheckPoint推荐使用Civitai上主流的

目前自己测下来：

- T0: `Realistic_Vision_V5.1.safetensors [00445494c8]`, `dreamshaper_8.safetensors [879db523c3]`
- T1: `anything-v5-PrtRE.safetensors [7f96a1a9ca]`, `ghostmix_v20Bakedvae.safetensors [e3edb8a26f]`
- 其他的都不太稳定

目前我还没有实验ControlNet for SDXL, 其实`qr code Monster`已经提供了[SDXL模型](https://civitai.com/models/197247?modelVersionId=221829)，后续我也会进行进一步测试。

#### 3.2. 图片尺寸推荐在768\*768以上

此为我自己得到的经验值，可当做阈值，这个尺寸往上出图的成功率比较高。
可能尺寸越小，二维码就越模糊，

#### 3.3 ControlNet权重

我的目的是想达到**二维码和美感的平衡**，权重高出二维码图容易，但不好看，权重低不容易出图，而且也认不出是个二维码。

`ControlNet`大致的影响过程可简单理解为:

```
控制权重 * ( 引导停止时机 - 引导引入时机 ）
```

`ControlNet`权重一共涉及到三个值，我的尝试结果如下：

- 控制权重，推荐1.1~1.25
- 引导引入时机，越大越好，推荐0.1~0.2
- 引导停止时机，越小越好，推荐0.8~0.9

  <img style="width:800px; height:auto;" src="/blogs/qrcode/controlnet-start.png"/>

## 写在最后

关于AI二维码的研究还没有结束，不论是美感还是成功率，都还有很多要做的研究要继续下去。
之后我计划测试结合多个`controlnet`，以及`SDXL`的尝试结果，如果进度还不错，我将继续更新，敬请期待~

## 扩展阅读

- [Stable Diffusion QR Code 101](https://antfu.me/posts/ai-qrcode-101)
- [qr code monster 介绍civitai](https://civitai.com/models/111006/qr-code-monster)
- [qr code monster 下载](https://huggingface.co/monster-labs/control_v1p_sd15_qrcode_monster/blob/main/control_v1p_sd15_qrcode_monster.safetensors)
- [【WOE】用肉眼识别二维码，总共分几步？](https://www.bilibili.com/video/BV1KZ4y1p72k/?spm_id_from=333.999.0.0&vd_source=4fd973d19cb5506a7c9f2d59e8ab5165)

## 附录

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01661-685635532.png"/>

> masterpiece,best quality,winter,snow field,blush,red flower,sky,sunset,mountain,forest,lake, (masterpiece:1.2), best quality, masterpiece, highres, original, extremely detailed wallpaper, perfect lighting,(extremely detailed CG:1.2)

> Negative prompt: easynegative,(worst quality:2),(low quality:2),(normal quality:2) verybadimagenegative_v1.3, NSFW, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((grayscale)), skin spots, acnes, skin blemishes, age spot, (ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers, (((extra arms and legs)))

> Steps: 40, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 685635532, Size: 1024x1024, Model hash: e3edb8a26f, Model: ghostmix_v20Bakedvae, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.1, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.15, Guidance End: 1, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "easynegative: c74b4e810b03", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01682-4137445243.png"/>

> masterpiece,best quality,sitting,full body,indoors,(1 mechanical girl locked on a hanger:1.5),(transparent surfaces and skins:1.5),(many mechanical gears and electronic components inside the body:1.4),(mechanical vertebra and cervial:1.3),solo,expressionless,(wires and cables attaching to head and body:1.4),(mechanical arms of surgical machine around:1.2),(Circuit boards:1.4),(character focus:1.3),science fiction, (masterpiece:1.2), best quality, masterpiece, highres, original, extremely detailed wallpaper, perfect lighting,(extremely detailed CG:1.2)

> Negative prompt: badhandv4,easynegative,verybadimagenegative_v1.3,(worst quality:2),(low quality:2),(normal quality:2),NSFW, NSFW, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((grayscale)), skin spots, acnes, skin blemishes, age spot, (ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers, (((extra arms and legs)))

> Steps: 25, Sampler: Euler a, CFG scale: 7, Seed: 4137445243, Size: 1024x1024, Model hash: e3edb8a26f, Model: ghostmix_v20Bakedvae, Clip skip: 2, ENSD: 31337, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.2, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.2, Guidance End: 0.9, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "badhandv4: 5e40d722fc3d, easynegative: 66a7279a88dd, verybadimagenegative_v1.3: d70463f87042", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01708-2583313787.png"/>

> (masterpiece),(best quality),(ultra-detailed),photorealistic,(best illustration),(an extremely delicate and beautiful),detailed scenery,sakura,sakura trees,sakura wind,floating,diffraction spikes,sunlight,blue sky,
> hakama,kimono,wide sleeves,anchor,cross-laced footwear,1girl,upper body,half updo
> Negative prompt: (worst quality, low quality:1.4),fastnegativev2
> Steps: 50, Sampler: DPM++ 2M SDE Karras, CFG scale: 7, Seed: 2583313787, Size: 1024x1024, Model hash: 7f96a1a9ca, Model: anything-v5-PrtRE, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.1, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.14, Guidance End: 0.8, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "FastNegativeV2: a7465e7cc2a2", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01714-2425333477.png"/>

> (masterpiece),(best quality),(ultra-detailed),photorealistic,(best illustration),(an extremely delicate and beautiful),detailed scenery,sakura,sakura trees,sakura wind,floating,diffraction spikes,sunlight,blue sky,hakama,kimono,wide sleeves,anchor,cross-laced footwear,1girl,upper body,half updo

> Negative prompt: (worst quality, low quality:1.4),fastnegativev2

> Steps: 50, Sampler: DPM++ 2M SDE Karras, CFG scale: 7, Seed: 2425333477, Size: 1024x1024, Model hash: 7f96a1a9ca, Model: anything-v5-PrtRE, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.1, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.14, Guidance End: 0.8, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "FastNegativeV2: a7465e7cc2a2", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01824-2292622729.png"/>

> (1girl:1.2),masterpiece,best quality,falling from the sky,clouds,balloons,clenched fist,upper_body,maid,flying skirt,pleated dress

> Negative prompt: NSFW,badhandv4,easynegative,verybadimagenegative_v1.3,(worst quality:2),(low quality:2),(normal quality:2),(multiple_girls:1.3)

> Steps: 55, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 2866753152, Size: 768x768, Model hash: e3edb8a26f, Model: ghostmix_v20Bakedvae, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.2, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.1, Guidance End: 0.9, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "badhandv4: 5e40d722fc3d, easynegative: 66a7279a88dd, verybadimagenegative_v1.3: d70463f87042", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01952-2866753143.png"/>

> (1gril:1.5),library,bow head,writing,paper,flying paper,masterpiece,upper_body,best quality,(masterpiece:1.2),best quality,perfect lighting,(extremely detailed CG:1.2)

> Negative prompt: NSFW,badhandv4,easynegative,verybadimagenegative_v1.3,(worst quality:2),(low quality:2),(normal quality:2)

> Steps: 50, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 2292622729, Size: 768x768, Model hash: e3edb8a26f, Model: ghostmix_v20Bakedvae, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.2, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.11, Guidance End: 1, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "badhandv4: 5e40d722fc3d, easynegative: 66a7279a88dd, verybadimagenegative_v1.3: d70463f87042", Version: v1.6.1

<img style="width:300px; height:auto;" src="/blogs/qrcode/good/01961-2866753152.png"/>

> (1girl:1.2),masterpiece,best quality,falling from the sky,clouds,balloons,clenched fist,upper_body,maid,flying skirt,pleated dress

> Negative prompt: NSFW,badhandv4,easynegative,verybadimagenegative_v1.3,(worst quality:2),(low quality:2),(normal quality:2),(multiple_girls:1.3)

> Steps: 55, Sampler: DPM++ 2M Karras, CFG scale: 7, Seed: 2866753143, Size: 768x768, Model hash: e3edb8a26f, Model: ghostmix_v20Bakedvae, Clip skip: 2, ControlNet 0: "Module: none, Model: qrCodeMonster_v20 [5e5778cb], Weight: 1.2, Resize Mode: Crop and Resize, Low Vram: False, Guidance Start: 0.1, Guidance End: 0.9, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "badhandv4: 5e40d722fc3d, easynegative: 66a7279a88dd, verybadimagenegative_v1.3: d70463f87042", Version: v1.6.1
