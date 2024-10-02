import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";


@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply("Bot started");
  }

  @On("photo")
  async onPhoto(@Ctx() ctx: Context) {
    if ("photo" in ctx.message) {
      console.log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
      );
    }
  }

  @On("sticker")
  async onSticker(@Ctx() ctx: Context) {
    if ("sticker" in ctx.message) {
      console.log(ctx.message.sticker);
      await ctx.reply("👌");
    }
  }

  @On("video")
  async onVideo(@Ctx() ctx: Context) {
    if ("video" in ctx.message)
      await ctx.replyWithVideo(String(ctx.message.video.file_id));
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    console.log(ctx);
    if ("text" in ctx.message) {
      if (ctx.message.text == "salom")
        await ctx.replyWithHTML("<b> Hello </b>");
      else await ctx.replyWithHTML(ctx.message.text);
    }
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.from);
    console.log(ctx.from.first_name);
  }
}