using k8sdisturber.Services;
using k8sdisturber;
using k8sdisturber.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogging(b => b.AddSimpleConsole(options =>
    {
        options.IncludeScopes = false;
        options.SingleLine = true;
        options.TimestampFormat = "hh:mm:ss ";
    }));

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<InfoService>();
builder.Services.AddSingleton<AppService>();
builder.Services.AddSingleton<K8sDisturberContext>();

builder.Services.Configure<AppOptions>(builder.Configuration);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

var appService = app.Services.GetService<AppService>();
if (appService == null) throw new InvalidOperationException();
appService.Initialize();

var ctx = app.Services.GetService<K8sDisturberContext>();

if (ctx != null)
{
    bool f = ctx.Database.CanConnect();
    await ctx.Database.EnsureDeletedAsync();
    await ctx.Database.EnsureCreatedAsync();

    ctx.Persons?.Add(new() { Name = "FooBlog" });
    await ctx.SaveChangesAsync();
}


app.Run();