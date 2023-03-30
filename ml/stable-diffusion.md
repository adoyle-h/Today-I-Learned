# Stable Diffusion

- Prompt: 提示词
- Negative Prompt: 反向提示词
- Width & Height:	要生成的图片尺寸。尺寸越大，越耗性能，耗时越久。
- CFG Scale: AI 对描述参数（Prompt）的倾向程度。值越小生成的图片越偏离你的描述，但越符合逻辑；值越大则生成的图片越符合你的描述，但可能不符合逻辑。
- Sampling Method: 采样方法。有很多种，但只是采样算法上有差别，没有好坏之分，选用适合的即可。
- Sampling Steps: 采样步长。太小的话采样的随机性会很高，太大的话采样的效率会很低，拒绝概率高 (可以理解为没有采样到, 采样的结果被舍弃了)。
- Seed: 随机数种子。生成每张图片时的随机种子，这个种子是用来作为确定扩散初始状态的基础。不懂的话，用随机的即可。
- Checkpoint:
- In-painting
- Out-painting
- Fp32: 意味着模型使用 32 位浮点数 (float point) 储存值，是模型的原始保存值
- Fp16: 意味模型用 16 位浮点数存，相对于 Fp32 更小更快，但是无法用于 CPU，因为有的半浮点精度运算在 CPU 上不支持。通常为了更快的运算，在 GPU 上我们也会将 Fp32 转换成 Fp16，这个可以在设置里配置。
- pruned: 意味对模型参数进行了修剪，以达到更快的运行速度（也就是丢了一些参数），感兴趣的参考：pruning-in-deep-learning-models
- ema: ema(Exponential Moving Average 指数移动均值) 是一个技术用来抵抗波动以得到更好的结果，比如小明多次最后一次考试考砸了，这不能反映他的水平，取多次平均才能更好地表达他水平。感兴趣的参考：What is EMA?
- .ckpt 和.safetensor：.ckpt 会把网络结构一起保存下来，如果有人在其中加入了病毒代码，也会直接运行！而 safetensor 只带了网络模型的参数值，而不带结构，所以加载比.ckpt 安全

## Prompt

- Stable Diffusion v1 模型，prompt 限制在 75 tokens，包括逗号。
