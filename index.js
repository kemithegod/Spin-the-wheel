const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const segments = [
  { value: 66,  copies: ["devil number. fitting.", "$66 and you're already sweating.", "chaos energy. pay up."] },
  { value: 77,  copies: ["lucky for you. not your wallet.", "$77. she notices.", "that's the vibe."] },
  { value: 99,  copies: ["so close to triple digits. adorable.", "$99. almost impressive.", "one dollar away from respect."] },
  { value: 111, copies: ["angel number. you're welcome.", "$111 and she smiles. briefly.", "divine timing."] },
  { value: 123, copies: ["sequential tribute. orderly. i approve.", "$123. step it up.", "progression is cute."] },
  { value: 150, copies: ["now we're talking.", "$150. this is what devotion looks like.", "halfway to really impressing me."] },
  { value: 200, copies: ["$200. say less.", "finally, some seriousness.", "no notes."] },
  { value: 222, copies: ["222. goddess tier confirmed.", "$222. you earned one nod.", "the knowing number."] },
  { value: 250, copies: ["a quarter thousand. respectable.", "$250. she felt that.", "not bad, little one."] },
  { value: 333, copies: ["triple threes. you felt called.", "$333. she's paying attention now.", "significant."] },
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const commands = [
    new SlashCommandBuilder()
      .setName('spin')
      .setDescription('Spin the wheel 🎡')
  ].map(c => c.toJSON());

  const rest = new REST().setToken(TOKEN);
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  console.log('Slash command registered.');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== 'spin') return;

  await interaction.reply({
    embeds: [new EmbedBuilder()
      .setTitle("🎡 The wheel is spinning...")
      .setDescription("She's deciding your fate. Wait.")
      .setColor(0x2b0a3d)]
  });

  await new Promise(r => setTimeout(r, 3000));

  const seg = segments[Math.floor(Math.random() * segments.length)];
  const copy = seg.copies[Math.floor(Math.random() * seg.copies.length)];

  await interaction.editReply({
    embeds: [new EmbedBuilder()
      .setTitle("The wheel has spoken.")
      .setDescription(`## Send $${seg.value} to Kemi\n\n*${copy}*`)
      .setColor(seg.value >= 333 ? 0xff9fd0 : 0xc9a84c)
      .setFooter({ text: "kemithegod · pay or pray" })]
  });
});

client.login(TOKEN);
