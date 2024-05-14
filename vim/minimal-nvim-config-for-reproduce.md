# 用于调试的最小 neovim 配置

1. 创建 repro.lua 文件，内容如下

    ```lua
    -- **DO NOT change the paths and don't remove the colorscheme**
    local root = vim.fn.fnamemodify("./.repro", ":p")

    -- set stdpaths to use .repro
    for _, name in ipairs({ "config", "data", "state", "cache" }) do
      vim.env[("XDG_%s_HOME"):format(name:upper())] = root .. "/" .. name
    end

    -- bootstrap lazy
    local lazypath = root .. "/plugins/lazy.nvim"
    if not vim.loop.fs_stat(lazypath) then
      vim.fn.system({ "git", "clone", "--filter=blob:none", "https://github.com/folke/lazy.nvim.git", lazypath, })
    end
    vim.opt.runtimepath:prepend(lazypath)

    vim.cmd.color "elflord"
    --------------------------------------------------------------------------------
    local plugins = {
    }

    require("lazy").setup(plugins, {
      root = root .. "/plugins",
    })
    ```

    它自动下载 lazy.nvim，并且会自动下载插件到 ./repro/plugins。

2. `nvim -u ./repro.lua`。它会在当前目录创建 .repro 目录，该目录独立存储所有 nvim 数据。
3. 调试完后删除 .repro 目录。
