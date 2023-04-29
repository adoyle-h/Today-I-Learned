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
