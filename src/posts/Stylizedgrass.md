---
title: Stylized grass
icon: folder
date: 2024-07-25
category:
  - UE engine
tag:
  - UE engine
  - Teaching
---

# Stylized Grass

#### In this issue, we will explain how to achieve stylized grass in the UE5.4 engine

There are many ways to achieve stylized effects in the UE engine. Here, I provide a pretty good implementation method.

First, we create a new material. This material needs to achieve the following functions:

- [x] Stylized grass color

- [x] Control the gradient height of the grass

- [x] Wind strength

- [x] Wind speed

> First, let's explain the color processing of the grass

- In stylization, the grass should not have only one color but a gradient transition.

- You need to handle the UV direction of the model in the modeling software.

- Next, we create a new material. After entering, we need to create the two colors you need.

Open the material graph. By holding down the **3** key and **left-clicking**, you can quickly create a Constant3Vector node. After creating it, we need to create another one for the base color. The upper color should be lighter, and the lower color should be darker. We use the Lerp node, connect the lighter color to A, the other to B, and of course, there is an Alpha node to control the gradient.

> Gradient Control

First, create a **MaterialFunctionCall**. We choose a built-in material function called LinearGradient. Then, hold down the **S** key and click in the material graph area to get a node. This node will be used to control the gradient later. We use material multiplication by holding down the **M** key to get the node and connect them as shown in the figure.

<img src="https://onedrive.live.com/embed?resid=2182F48B953D36F8%2114548&authkey=%21AA7SEI36kl1hKHA&width=815&height=647" width="815" height="647" />

> Normal Map Creation

Similarly, hold down the **3** key to get a basic vector, then change the Z value to 1 to get a pure blue color. Create a **TwoSidedSign** node and multiply it as above, then connect the result to the normal map.

> Wind Creation

To make the grass look more natural, wind is essential. SimpleGrassWind is a useful node for simulating wind. The first input is wind strength, which we need to control and modify. Hold down the **S** key to get a controller and connect it. The third input is wind speed, which we connect similarly. The last input is the grass position, as shown in the figure.

<img src="https://onedrive.live.com/embed?resid=2182F48B953D36F8%2114549&authkey=%21AIQ34gXT0NumuJ8&width=1331&height=630" width="1331" height="630" />

We have now implemented all the functions.

### Related Links

[Stylized Grass by FY | Blueprint UE | Unreal Engine's PasteBin, (blueprintue.com)](https://blueprintue.com/blueprint/dte1ofgq/) I have shared it on the blueprint sharing website. Feel free to explore. Thanks for watching.
