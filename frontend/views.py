from django.shortcuts import render

# Create your views here.
def HomePage(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def Google(request, *args, **kwargs):
    return render(request, 'frontend/google15457510d2cba688.html')


