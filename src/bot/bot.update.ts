import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";


@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply("Bot started");
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
}