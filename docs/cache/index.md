# 介绍

- 缓存与缓冲
- WEB 开发者们为缩短用户等待时间做出了一系列方案，以期「短益求短」。比如用 PWA 缓存更多可用的离线资源，让网页应用打开更快；借助 WebAssembly 规范缩小资源体积，提高执行效率。
- 用户硬件

## 前言

缓存可以减少网络 IO 消耗，提高访问速度。浏览器缓存是一种操作简单、效果显著的前端性能优化手段。Chrome 官方的解释：
> 通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，缓存并重复利用之前获取的资源的能力成为性能优化的一个关键方面。

## 浏览器缓存机制

掘金首层

- Memory Cache
- Service Worker Cache
- HTTP Cache 
- Push Cache

![](../.vuepress/public/assets/2020-06-14-12-27-22-browser-cache-01.png)

## HTTP 缓存机制探秘

HTTP 缓存分为`强缓存`和`协商缓存`。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

### 强缓存的特征

强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，**不会再与服务端发生通信**。

### 强缓存的实现：从 expires 到 cache-control

实现强缓存，过去一直用 `expires`:

```bash
expires: Wed, 11 Sep 2019 16:12:18 GMT
```

它是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。

但是 expires 是有问题的，它最大的问题在于对“本地时间”的依赖。如果服务端和客户端的时间设置可能不同，或者我们直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。

于是 HTTP 1.1 新增了 `Cache-Control` 字段来完成 expires 的任务。

```bash
cache-control: max-age=31536000
```

在 Cache-Control 中，我们通过 `max-age` 来控制资源的有效期。max-age 不是一个时间戳，而是一个`时间段`。`max-age=31536000` 意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

Cache-Control 相对于 expires 更加准确，它的优先级也更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache
-Control 为准。

### Cache-Control 应用分析

![](../.vuepress/public/assets/2020-06-14-12-54-31-browser-cache-02.png)

这里的 <u>s-maxage 优先级高于 max-age，两者同时出现时，优先考虑 s-maxage。如果 s-maxage 未过期，则向代理服务器请求其缓存内容。</u>在项目不是特别大的场景下，max-age 足够用了。但在依赖各种代理的大型架构中，我们不得不考虑`代理服务器`的缓存问题。s-maxage 就是用于表示 cache 服务器上（比如 `cache CDN`）的缓存的有效时间的，并只对 `public` 缓存有效。

s-maxage 仅在代理服务器中生效，客户端我们只考虑 max-age。

## Memory Cache

## 如何有效利用浏览器缓存

### 哪些资源适合（不适合）缓存

## 本地存储

- Cookie
- Web Storage 
- IndexDB

## CDN 的缓存

