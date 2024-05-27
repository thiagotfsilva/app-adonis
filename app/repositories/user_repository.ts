import User from '#models/user'

export class UserRespository {
  async create(data: User): Promise<User> {
    return await User.create(data)
  }

  async findAll(): Promise<User[]> {
    return await User.all()
  }

  async findById(id: number): Promise<User> {
    return await User.findByOrFail({ id })
  }

  async update(id: number, { fullName, phoneNumber, password }: User): Promise<User> {
    const user = await User.findByOrFail({ id })
    user.fullName = fullName
    user.phoneNumber = phoneNumber
    user.password = password
    user.save()

    return user
  }

  async delete(id: number): Promise<void> {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
