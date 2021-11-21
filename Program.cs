using k8sdisturber.Services;
using k8sdisturber;

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

app.Run();