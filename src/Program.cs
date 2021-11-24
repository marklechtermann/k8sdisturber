using k8sdisturber.Services;
using k8sdisturber;
using k8sdisturber.DataAccess;

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
builder.Services.AddTransient<K8sDisturberContext>();
builder.Services.AddTransient<UserRepositoryService>();

builder.Services.Configure<AppOptions>(builder.Configuration);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
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

var appService = app.Services.GetService<AppService>();
if (appService == null) throw new InvalidOperationException();
appService.Initialize();

var ctx = app.Services.GetService<K8sDisturberContext>();
ctx?.EnsureInitializedAsync();

app.Run();