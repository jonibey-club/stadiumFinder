import { log } from "console";
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.botService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async addNewAddress(@Ctx() ctx: Context) {
    await this.botService.addNewAddress(ctx);
  }

  @Hears("Mening manzillarim")
  async showAddresses(@Ctx() ctx: Context) {
    await this.botService.showAdresses(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }

  @Action(/location_+[1-9]/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.botService.onClickLocation(ctx);

  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message) {
  //     console.log(ctx.message.sticker);
  //     await ctx.reply("👌");
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message) {
  //     console.log(ctx.message.animation.file_id);
  //     await ctx.replyWithAnimation(ctx.message.animation.file_id);
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message) {
  //     console.log(ctx.message.contact);
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //     await ctx.reply(String(ctx.message.contact.vcard));
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(
  //       `Coordinates: ${ctx.message.location.latitude}, ${ctx.message.location.longitude}`
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message) {
  //     console.log(ctx.message.voice.file_id);
  //     await ctx.replyWithVoice(
  //       "AwACAgIAAxkBAAMnZvzcyOcsPRDZIT_o0qKrc6_A5WgAApBSAAL3uuhL3eTXuTXo4HE2BA"
  //     );
  //   }
  // }

  // @On("invoice")
  // async onInvoice(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message) {
  //     console.log(ctx.message.invoice);

  //     await ctx.reply(String(ctx.message.invoice.title));
  //     await ctx.reply(String(ctx.message.invoice.description));
  //     await ctx.reply(String(ctx.message.invoice.total_amount));
  //     await ctx.reply(String(ctx.message.invoice.currency));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message) {
  //     console.log(ctx.message.document);

  //     await ctx.replyWithDocument(ctx.message.document.file_id);
  //     await ctx.reply(String(ctx.message.document.file_id));
  //     await ctx.reply(String(ctx.message.document.file_name));
  //     await ctx.reply(String(ctx.message.document.file_size));
  //   }
  // }

  // @Hears("hi")
  // async onHi(@Ctx() ctx: Context) {
  //   await ctx.reply("hi,there");
  // }

  // @Command("help")
  // async commandHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(
  //     `<b>start</b> - Botni ishga tushirish\n<b>stop</b> - Botni to'xtatish\n<b>help</b> - Ushbu buyruqlar ro'yxatini ko'rsatadi`
  //   );
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message)
  //     await ctx.replyWithVideo(String(ctx.message.video.file_id));
  // }

  // @Command("inline")
  // async inline(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Button 1",
  //         callback_data: "button1",
  //       },
  //       {
  //         text: "Button 2",
  //         callback_data: "button2",
  //       },
  //       {
  //         text: "Button 3",
  //         callback_data: "button3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 4",
  //         callback_data: "button4",
  //       },
  //       {
  //         text: "Button 5",
  //         callback_data: "button5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 6",
  //         callback_data: "button6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Kerakli inline buttonni tanla: ", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button1")
  // async onClickButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button 1 tugmasi bosildi!");
  // }

  // @Action(/button+[1-9]/)
  // async onClickAnyButton(@Ctx() ctx: Context) {
  //   const buttonData = ctx.callbackQuery.chat_instance;
  //   await ctx.reply(`Ixtiyoriy ${buttonData} Button  tugmasi bosildi!`);
  // }

  // @Command("main")
  // async mainButtons(@Ctx() ctx: Context) {
  //   await ctx.reply("Kerakli Main Buttonni tanla:", {
  //     parse_mode: "HTML",
  //     ...Markup.keyboard([
  //       ["bir", "ikki", "uch"],
  //       ["to'rt", "besh"],
  //       ["boshqa"],
  //       [Markup.button.contactRequest("📱Telefon raqamni yuboring")],
  //       [Markup.button.locationRequest("📍 Lokatsiyani yuboring")],
  //       [Markup.button.game("🎮 oyinni yuboring")],
  //     ])
  //       .resize()
  //       .oneTime(),
  //   });
  // }

  // @Hears("bir")
  // async on1ClickButton(@Ctx() ctx: Context) {
  //   await ctx.reply("1-Button  bosildi!");
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("text" in ctx.message) {
  //     if (ctx.message.text == "salom")
  //       await ctx.replyWithHTML("<b> Hello </b>");
  //     else await ctx.replyWithHTML(ctx.message.text);
  //   }
  // }

  // @On("message")
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  //   console.log(ctx.chat);
  //   console.log(ctx.from);
  //   console.log(ctx.from.first_name);
  // }
}
