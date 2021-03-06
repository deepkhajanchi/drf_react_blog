from rest_framework import serializers
from .models import Blog, User,Profile
from django.contrib.auth.models import User, auth
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
# import base64


class BlogSerializer(serializers.ModelSerializer):
    author = User.objects.all()
    class Meta:
        model = Blog
        #fields = ['id', 'title', 'category', 'author', 'content', 'created_on']
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email','id')
        # fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    # image = Base64ImageField(max_length=None, use_url=True,
    #     required=False,
    #     allow_null=True,
    #     allow_empty_file=True)
    image = serializers.FileField()
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')