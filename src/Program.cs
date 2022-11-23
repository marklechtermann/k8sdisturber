using k8sdisturber.Services;
using k8sdisturber;
using k8sdisturber.DataAccess;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddSimpleConsole(options =>
    {
        options.IncludeScopes = false;
        options.SingleLine = true;
        options.TimestampFormat = "hh:mm:ss ";
    });

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<InfoService>();
builder.Services.AddSingleton<AppService>();
builder.Services.AddTransient<K8sDisturberContext>();
builder.Services.AddTransient<UserRepositoryService>();
builder.Services.AddTransient<KubernetesService>();

builder.Services.Configure<AppOptions>(builder.Configuration);

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

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
ctx?.EnsureInitializedAsync();

app.Run();