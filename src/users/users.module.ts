import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { compare, compareSync, genSalt, hash } from 'bcryptjs';
import { User, UserSchema } from './models/users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            var user = this;

            if (!user.isModified('password')) return next();

            // generate a salt
            genSalt(10, function (err, salt) {
              if (err) return next(err);

              // hash the password using our new salt
              hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one
                user.password = hash;
                next();
              });
            });
          });

          schema.methods.validatePassword = async function (
            password: string,
          ): Promise<boolean> {
            return compare(password, this.password);
          };
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
